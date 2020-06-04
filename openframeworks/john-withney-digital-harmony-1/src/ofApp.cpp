#include "ofApp.h"
ofPolyline line;

//--------------------------------------------------------------
void ofApp::setup(){
    ofEnableSmoothing();
    ofSetLineWidth(3);
    
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
    float t = ofGetElapsedTimef();
    ofEnableBlendMode(OF_BLENDMODE_SCREEN);
    ofBackground(0);
    ofSetColor(255);
    ofTranslate(0, ofGetHeight()/2);
    int nSteps = 1000;
    int folds = 12;
    for (int fold = folds; fold > 0; fold--) {
        float hue = ofMap(fold, 1, folds, 0, 255);
        float amp = 400/(fold*2);
        ofPolyline line;
        ofColor c = ofColor(0);
        c.setHsb(hue, 255, 255);
        ofSetColor(c);
        for (int i = 0; i < nSteps; i++) {
            float x = ofMap(i, 0, nSteps, 10, ofGetWidth()-10);
            float phase = ofMap(i, 0, nSteps, 0, TWO_PI*fold);
            float y = ofMap(sin(phase), -1, 1, -amp, amp);
            line.addVertex(x, y);
        }
        line.draw();
    }
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
