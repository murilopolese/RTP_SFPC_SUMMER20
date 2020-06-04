#include "ofApp.h"
float maxSize = 280;
//--------------------------------------------------------------
void ofApp::setup(){
    ofEnableSmoothing();
    ofSetLineWidth(4);
}

//--------------------------------------------------------------
void ofApp::update(){

}

void shape_1() {
    float t = ofGetElapsedTimef();
    int n = 180;
    for(int i  = 0; i < n/2+1; i += 2) {
        float phase = ofMap(i, 0, n, 0, PI);
        float r1 = 1;
        float r2 = 0.5 + 0.45*sin(t+phase*91);
        float x1 = r1 * cos(phase) * maxSize;
        float y1 = r1 * sin(phase) * maxSize;
        float x2 = r2 * cos(phase) * maxSize;
        float y2 = r2 * sin(phase) * maxSize;
        if (r2 > 0.5) {
            ofDrawLine(x1, y1, x2, y2);
        }
    }
}
void shape_1(float scale) {
    float t = ofGetElapsedTimef();
    int n = 180;
    for(int i  = 0; i < n/2+1; i += 2) {
        float phase = ofMap(i, 0, n, 0, PI);
        float r1 = 1*scale;
        float r2 = (0.5) + 0.5*sin(t+phase*91) + 0.5*(1-scale);
        float x1 = r1 * cos(phase) * maxSize;
        float y1 = r1 * sin(phase) * maxSize;
        float x2 = r2 * cos(phase) * maxSize;
        float y2 = r2 * sin(phase) * maxSize;
        if (r2 > 0.5) {
            ofDrawLine(x1, y1, x2, y2);
        }
    }
}
void first_layer() {
    ofSetLineWidth(5);
    ofPushMatrix();
        ofScale(-1, -1);
        ofRotateDeg(90);
        ofSetColor(244, 0, 244);
        shape_1();
    ofPopMatrix();
    ofPushMatrix();
        ofScale(1, -1);
        ofRotateDeg(90);
        ofSetColor(244, 0, 244);
        shape_1();
    ofPopMatrix();
    
    ofSetLineWidth(10);
    ofScale(1, -1);
    
    ofPushMatrix();
        ofScale(-1, -1);
        ofRotateDeg(90);
        ofSetColor(244, 0, 0);
        shape_1();
    ofPopMatrix();
    ofPushMatrix();
        ofScale(1, -1);
        ofRotateDeg(90);
        ofSetColor(244, 0, 0);
        shape_1();
    ofPopMatrix();
    
    ofSetLineWidth(2);
    
    ofPushMatrix();
        ofScale(-1, -1);
        ofRotateDeg(90);
        ofSetColor(244, 240, 0);
        shape_1(0.98);
    ofPopMatrix();
    ofPushMatrix();
        ofScale(1, -1);
        ofRotateDeg(90);
        ofSetColor(244, 240, 0);
        shape_1(0.98);
    ofPopMatrix();
}
void shape_2() {
    float t = ofGetElapsedTimef();
    ofSetLineWidth(1.5);
    int n = 90;
    for(int i  = 1; i < n+1; i += 1) {
        float phase = ofMap(i, 0, n, 0, TWO_PI);
        float r1 = 0.6 + 0.25*sin(t+4.6+phase * 2);
        float r2 = r1 - 0.3*ofMap(cos(t+phase * 2), -1, 1, 0, 1);
        float x1 = r1 * cos(phase) * maxSize;
        float y1 = r1 * sin(phase) * maxSize;
        float x2 = r2 * cos(phase) * maxSize;
        float y2 = r2 * sin(phase) * maxSize;
        ofDrawLine(x1, y1, x2, y2);
    }
}

void shape_3() {
    float t = ofGetElapsedTimef();
    ofSetLineWidth(3);
    int n = 36;
    for(int i  = 0; i < n+1; i++) {
        float phase = ofMap(i, 0, n, 0, TWO_PI);
        float s = ofMap(sin(t+phase), -1, 1, 0, 1);
        float c = ofMap(cos(t+phase), -1, 1, 0, 1);
        float r1 = 0.6 * s;
        float r2 = 0.4 * s;
        float x1 = r1 * c * maxSize;
        float y1 = r1 * s * maxSize;
        float x2 = r2 * c * maxSize;
        float y2 = r2 * s * maxSize;
        ofDrawLine(x1, y1, x2, y2);
    }
}

//--------------------------------------------------------------
void ofApp::draw(){
    float t = ofGetElapsedTimef();
    
    ofBackground(0);
    ofTranslate(ofGetWidth()/2, ofGetHeight()/2);
    
    ofPushMatrix();
        first_layer();
    ofPopMatrix();
    
    ofPushMatrix();
        ofSetColor(0, 244, 0);
        shape_2();
    ofPopMatrix();
    
    ofPushMatrix();
        ofSetColor(255, 155, 244);
        ofRotateDeg(35);
        shape_3();
        ofRotateDeg(180);
        ofSetColor(255, 255, 144);
        shape_3();
    ofPopMatrix();
    
//    ofSetColor(255, 0, 244);
//    ofDrawBitmapString(t, 0, 0);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
